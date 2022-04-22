import { useEffect, useState } from "react";

export function Index() {
  const [message, setMessage]=useState('');
  useEffect(() => {
    fetch(process.env.NX_BACKEND_URL)
    .then(res => res.json())
    .then(data => setMessage(data.message));
  },[]);

  return (
    <div>
      <p>frontend initial page</p>
      <p>{message}</p>
    </div>
  );
}

export default Index;
