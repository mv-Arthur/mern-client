import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useSelector } from "react-redux";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const imageUrl = "";
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const [isLoading, setLoading] = React.useState("");
  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const [ticketClass, setClass] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [flight, setFlight] = React.useState("");
  const [timeOut, setTimeOutSt] = React.useState("");
  const [timeIn, setTimeIn] = React.useState("");

  const isEdditing = Boolean(id);
  React.useEffect(() => {
    if (ticketClass === "эконом") {
      setPrice(1000);
    }
    if (ticketClass === "бизнес") {
      setPrice(7000);
    }
    if (ticketClass === "первый класс") {
      setPrice(12000);
    }

    if (flight === "Воронеж - Калининград") {
      setTimeIn("00:00");
      setTimeOutSt("04:30");
    }

    if (flight === "Казань - Уфа") {
      setTimeIn("12:00");
      setTimeOutSt("16:10");
    }

    if (flight === "Норильск - Москва") {
      setTimeIn("13:00");
      setTimeOutSt("18:50");
    }

    if (flight === "Минск - Москва") {
      setTimeIn("10:10");
      setTimeOutSt("13:00");
    }

    if (flight === "Сочи - Казань") {
      setTimeIn("00:10");
      setTimeOutSt("06:30");
    }

    console.log(place);
  }, [ticketClass, flight]);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/ticket/${id}`)
        .then(({ data }) => {
          setClass(data.ticketClass);
          setPlace(data.place);
          setPrice(data.price);
          setFlight(data.flight);
          setTimeOutSt(data.timeOut);
          setTimeIn(data.timeIn);
        })
        .catch((err) => {
          alert("ошибка получения статьи");
          console.warn(err);
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        ticketClass: ticketClass,
        price: price,
        place: place,
        timeIn: timeIn,
        timeOut: timeOut,
        flight: flight,
      };
      const { data } = isEdditing
        ? await axios.patch(`/ticket/${id}`, fields)
        : await axios.post("/ticket", fields);
      const _id = isEdditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      alert("ошибка при отправке статьи");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Paper style={{ padding: 30 }}>
      {/* <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      /> */}
      <Form.Select
        style={{ marginBottom: "40px" }}
        onChange={(e) => {
          setFlight(e.target.value);
        }}
        aria-label="Default select example"
      >
        <option>выберете рейс</option>
        <option value="Москва - Санкт-петербург">
          Москва - Санкт-петербург
        </option>
        <option value="Воронеж - Калининград">Воронеж - Калининград</option>
        <option value="Казань - Уфа">Казань - Уфа</option>
        <option value="Норильск - Москва">Норильск - Москва</option>
        <option value="Минск - Москва">Минск - Москва</option>
        <option value="Сочи - Казань">Сочи - Казань</option>
      </Form.Select>

      <Form.Select
        style={{ marginBottom: "40px" }}
        onChange={(e) => {
          setClass(e.target.value);
        }}
        aria-label="Default select example"
      >
        <option>выберете класс билета</option>
        <option value="бизнес">бизнес</option>
        <option value="эконом">эконом</option>
        <option value="первый класс">первый класс</option>
      </Form.Select>
      <Form.Select
        style={{ marginBottom: "40px" }}
        onChange={(e) => {
          setPlace(e.target.value);
        }}
        aria-label="Default select example"
      >
        <option>выберете место</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">3</option>
        <option value="5">4</option>
        <option value="6">5</option>
        <option value="7">6</option>
        <option value="8">7</option>
        <option value="9">8</option>
        <option value="10">9</option>
        <option value="11">10</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
      </Form.Select>

      <h2
        style={{
          display: "block",
          width: "100%",
          padding: "0.375rem 2.25rem 0.375rem 0.75rem",

          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          color: "#212529",
          backgroundColor: "#fff",

          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px 12px",
          border: " 1px solid #ced4da",
          borderRadius: "0.375rem",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          appearance: "none",
          marginBottom: "40px",
        }}
      >
        стоимость билета: {price}
      </h2>

      <h2
        style={{
          display: "block",
          width: "100%",
          padding: "0.375rem 2.25rem 0.375rem 0.75rem",

          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          color: "#212529",
          backgroundColor: "#fff",

          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px 12px",
          border: " 1px solid #ced4da",
          borderRadius: "0.375rem",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          appearance: "none",
          marginBottom: "40px",
        }}
      >
        время вылета: {timeOut}
      </h2>

      <h2
        style={{
          display: "block",
          width: "100%",
          padding: "0.375rem 2.25rem 0.375rem 0.75rem",

          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          color: "#212529",
          backgroundColor: "#fff",

          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px 12px",
          border: " 1px solid #ced4da",
          borderRadius: "0.375rem",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          appearance: "none",
          marginBottom: "40px",
        }}
      >
        приблизительное время прибытия: {timeIn}
      </h2>
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdditing ? "сохранить" : "купить билет"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
