import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import "./test.css";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      userId: {},
      categories: [{}],
      selectFillCategory: "",
      error: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/all_categories", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          categories: result,
        });
        console.log(result);
      });

    fetch("http://localhost:3000/api/check_cookie", {
      method: "POST",
      body: document.cookie.toString(),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          userId: result,
          isLoaded: true,
          error: null,
        });
      });
  }

  checkLengthPrice = (e) => {
    if (e.target.value.length > 6) {
      e.target.value = e.target.value.substring(0, 6);
    } else {
      console.log(2);
    }
  };

  checkLengthPhone = (e) => {
    if (e.target.value.length > 13) {
      e.target.value = e.target.value.substring(0, 13);
    } else {
      console.log(2);
    }
  };

  setCategory = (e) => {
    this.setState({
      selectFillCategory: e.target.value,
    });
  };

  render() {
    if (this.state.error == 1 || Object.keys(this.state.userId)[0] == "error") {
      return <Redirect push to="/login" />;
    } else {
      return (
        <Container className="root">
          <h1>Подать объявление</h1>
          <form noValidate method="POST" action="/api/add_product">
            <Grid className="Grid" item={true} xs={10}>
              <TextField
                inputProps={{ maxLength: 30 }}
                name="inpFilledHeader"
                id="inpFilledHeader"
                label="Заголовок"
                variant="filled"
                fullWidth={true}
              />

              <FormControl
                fullWidth={true}
                variant="standard"
                style={{ marginTop: "25px" }}
              >
                <FormLabel style={{ marginLeft: "12px" }}>
                  Выберете категорию
                </FormLabel>
                <Select
                  fullWidth={true}
                  onChange={this.setCategory}
                  defaultValue=""
                  id="selectFillCategory"
                  name="selectFillCategory"
                >
                  {this.state.categories.map((i, k) => {
                    return (
                      <MenuItem value={i.category_id} key={k}>
                        {i.category_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              className="Grid"
              container
              direction="row"
              ustify="space-between"
              item={true}
              xs={12}
            >
              <FormControl>
                <FormLabel>Состояние</FormLabel>
                <RadioGroup
                  name="inpFilledCondition"
                  id="inpFilledCondition"
                  aria-label="gender"
                >
                  <FormControlLabel
                    value="Новый"
                    control={<Radio />}
                    label="Новый"
                  />
                  <FormControlLabel
                    value="Б/у"
                    control={<Radio />}
                    label="Б/у"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              className="Grid"
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
              item={true}
              xs={10}
            >
              <TextField
                onChange={this.checkLengthPrice}
                name="inpFilledPrice"
                id="inpFilledPrice"
                label="Цена в гривнах"
                variant="filled"
                type="number"
                fullWidth={true}
              />
            </Grid>
            <Grid
              className="Grid"
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
              item={true}
              xs={10}
            >
              <TextField
                inputProps={{ maxLength: 300 }}
                name="inpFilledDescription"
                id="inpFilledDescription"
                label="Описание"
                variant="filled"
                fullWidth={true}
                multiline={true}
                rows={5}
              />
            </Grid>
            <Grid
              className="Grid"
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
              item={true}
              xs={10}
            >
              <TextField
                onChange={this.checkLengthPhone}
                name="inpFilledTel"
                id="inpFilledTel"
                label="Номeре телефон"
                variant="filled"
                fullWidth={true}
                type="number"
                defaultValue="380"
              />
            </Grid>
            <Grid
              className="Grid"
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
              item={true}
              xs={10}
            >
              <Button
                id="inpId"
                name="inpId"
                type="submit"
                fullWidth={true}
                variant="contained"
                color="primary"
                defaultValue=""
                onClick={this.shortDescription}
              >
                Отправить
              </Button>
            </Grid>
          </form>
        </Container>
      );
    }
  }
}

export default AddProduct;
