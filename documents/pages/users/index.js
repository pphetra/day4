import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import { useDebounce } from "../../components/hooks/useDebounce";

const fetchUsers = async ({ queryKey }) => {
  const [_, url] = queryKey;
  const res = await fetch(url);
  return res.json();
};

export default function UserList() {
  const [state, setState] = useState({
    current_page: 1,
    last_page: 1,
    links: [],
    url: "/api/users?page=1",
    data: [],
  });

  const [filter, setFilter] = useState({
    name: "",
    username: "",
  });

  useEffect(() => {
    setState({
      ...state,
      url: `/api/users?page=$1&name=${filter.name}&username=${filter.username}`,
    });
  }, [filter]);

  const debouncedUrl = useDebounce(state.url, 500);

  const query = useQuery(["users", debouncedUrl], fetchUsers, {
    keepPreviousData: false,
    onSuccess: (data) => {
      console.log("data", data);
      setState({
        ...state,
        current_page: data.current_page,
        last_page: data.last_page,
        links: data.links,
        data: data.data,
      });
    },
  });

  const applyFilter = () => {
    const url = `/api/users?page=1&name=${filter.name}&username=${filter.username}`;
    setState({
      ...state,
      url,
    });
  };

  const table = (
    <table className="bg-white w-full border rounded shadow-sm">
      <thead>
        <tr className="border-b bg-gray-100 text-sm font-medium text-left h-12">
          <th className="p-4">id</th>
          <th className="p-4">name</th>
          <th className="p-4">username</th>
          <th className="p-4">provice</th>
          <th className="p-4">active</th>
        </tr>
      </thead>
      <tbody>
        {state.data.map((user) => (
          <tr key={user.id} className="border-b h-10">
            <td className="p-4">{user.id}</td>
            <td className="p-4">{user.name}</td>
            <td className="p-4">{user.username}</td>
            <td className="p-4">{user.province_code}</td>
            <td className="p-4">{user.is_active}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const paginate = (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <span className="flex flex-row gap-1">
            {state.links.map((link) => (
              <a
                className="px-1 bg-blue-50"
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setState({ ...state, url: link.url });
                }}
              >
                {decode(link.label)}
              </a>
            ))}
          </span>
          <span className="text-sm text-gray-500">
            Page {state.current_page} of {state.last_page}
          </span>
        </div>
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );

  return (
    <div className="max-w-4xl p-2">
      <h2>users</h2>
      <div className="flex gap-2 my-2">
        <input
          className="border rounded p-1"
          type="text"
          value={filter.name}
          placeholder="name"
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <input
          className="border rounded p-1"
          type="text"
          value={filter.username}
          placeholder="username"
          onChange={(e) => setFilter({ ...filter, username: e.target.value })}
        />
      </div>
      {query.isLoading ? <div>loading...</div> : table}
      {paginate}
    </div>
  );
}
