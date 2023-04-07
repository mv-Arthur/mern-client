import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios.js";
import { Navigate } from "react-router-dom";
import { Login } from "./Login/index.jsx";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts } from "../redux/slices/posts.js";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  console.log(userData);
  const navigate = useNavigate();
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostLoading = posts.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  if (!userData) {
    navigate("/login");
  }
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="" />
        <Tab label="" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                key={index}
                title={obj.ticketClass}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.place}
                commentsCount={obj.price}
                tags={["react", "fun", "typescript"]}
                flight={obj.flight}
                timeIn={obj.timeIn}
                timeOut={obj.timeOut}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
          // items={["react", "typescript", "заметки", "dsa"]}
          // isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
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
          />
        </Grid>
      </Grid>
    </>
  );
};
