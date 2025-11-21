"use client"
import Counter from "./components/Counter";
import Counter2 from "./components/Counter2";
import Hello from "./components/Hello";
import InputSample from "./components/InputSample";
import InputSample2 from "./components/InputSample2";
import Start from "./components/Start";
import UserList from "./components/user/UserList";
import UserList2 from "./components/user/UserList2";

export default function Home() {
  return (
    <div className="min-h-screen p-10 text-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl my-5">next.js page</h1>
      {/* 컴포넌트 삽입 */}
      <Hello />
      <Start />
      <hr />
      <Counter />
      <hr />
      <Counter2 num={100}/>
      <hr />
      <InputSample />
      <hr />
      <InputSample2 />
      <hr />
      <UserList />
      <hr />
      <UserList2 />
    </div>
  );
}