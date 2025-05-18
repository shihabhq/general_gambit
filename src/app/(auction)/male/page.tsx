const MaleAuction = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log(data);
  return <div>{data.title}</div>;
};

export default MaleAuction;
