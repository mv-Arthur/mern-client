import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/ticket/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("ошибка получения билета");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        _id={data._id}
        title={data.ticketClass}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.place}
        commentsCount={data.price}
        tags={["react", "fun", "typescript"]}
        timeIn={data.timeIn}
        timeOut={data.timeOut}
        flight={data.flight}
        isEditable
        isFullPost
      >
        <p>
          Фамилия покупателя: {data.user.surname}
          <br></br>
          Имя покупателя: {data.user.name}
          <br></br>
          Отчество покупателя: {data.user.patronimyc}
          <br></br>
          Email: {data.user.email}
        </p>
      </Post>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={true}
      >
        {/* <Index /> */}
      {/* </CommentsBlock> */}
    </>
  );
};
