import "./chatspage.scss";
import Chat from "../../components/chat/Chat";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const Chatspage = () => {
  const data = useLoaderData();

  return (
    <div className="chatspage">
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.chatResponse}
          errorElement={<p>Error loading chats!</p>}
        >
          {(chatResponse) => <Chat chats={chatResponse.data} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Chatspage;
