import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Button,
  Box,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./ProductStyle.css";

class ListOfProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      categories: [],
      searchS: "",
      categoryS: "",
      conditionS: "",
      submit: "",
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

    fetch("http://localhost:3000/api/product_list", {
      method: "POST",
      body: document.cookie.toString(),
    })
      .then((res) => res.json())
      .then(
        (results) => {
          this.setState({
            isLoaded: true,
            users: results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: 1,
          });
        }
      );
  }

  addValueToState = (e) => {
    if (e.target.name === "buttonSearch") {
      this.setState({
        submit: "done",
      });
    } else if (e.target.name === "selectFillCategory") {
      this.setState({
        categoryS: e.target.value,
      });
    } else if (e.target.name === "inpFilledCondition") {
      this.setState({
        conditionS: e.target.value,
      });
    } else if (e.target.name === "inpFilledSearch") {
      this.setState({
        searchS: e.target.value,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.submit != "") {
      this.setState({
        submit: ""
      })
      const obj = {
        search: this.state.searchS,
        category: this.state.categoryS,
        condition: this.state.conditionS,
      };
      console.log(obj);

      fetch("http://localhost:3000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            users: result
          })
        });
    } else {
      console.log("submit === null");
    }
  }

  render() {
    if (this.state.error == 1) {
      return <Redirect push to="/login" />;
    } else {
      return (
        <Paper style={{ backgroundColor: "silver" }}>
          <form noValidate>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              item="true"
            >
              <TextField
                inputProps={{ maxLength: 30 }}
                onChange={this.addValueToState}
                name="inpFilledSearch"
                id="inpFilledSearch"
                label="Что ищите ?"
                size="medium"
                type="text"
                fullWidth={true}
                alignItems="center"
                style={{
                  margin: "10px",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <FormControl
                fullWidth={true}
                variant="standard"
                onChange={this.addValueToState}
                style={{
                  margin: "10px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <FormLabel style={{ marginLeft: "12px" }}>
                  Выберете категорию
                </FormLabel>
                <Select
                  id="selectFillCategory"
                  name="selectFillCategory"
                  onChange={this.addValueToState}
                  defaultValue=""
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
              <FormControl fullWidth={true}>
                <FormLabel>Состояние</FormLabel>
                <RadioGroup
                  name="inpFilledCondition"
                  id="inpFilledCondition"
                  aria-label="gender"
                  onChange={this.addValueToState}
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
              <Button
                id="buttonSearch"
                name="buttonSearch"
                type="button"
                variant="contained"
                onClick={this.addValueToState}
                style={{ margin: "10px" }}
              >
                Поиск
                <SearchIcon /*Картинка и текст не кликабельны*/ />
              </Button>
            </Box>
          </form>
          {this.state.users.map((i, k) => {
            return (
              <Grid style={{ padding: 24 }} item={true} key={k}>
                <Paper>
                  <Grid container>
                    <Grid item={true}>
                      <ButtonBase style={{ margin: "12px" }}>
                        <img
                          className="Img"
                          alt="complex"
                          src="https://static.probusiness.io/720x480c/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg"
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item={true} xs={12} sm container>
                      <Grid item={true} xs container direction="column">
                        <Grid item={true} xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            style={{ fontSize: "24px", fontFamily: "Arial" }}
                          >
                            {i.header}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: "20px",
                              fontFamily: "Arial",
                              marginBottom: "32px",
                            }}
                          >
                            {i.price} грн.
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: "20px",
                              fontFamily: "Arial",
                              marginBottom: "32px",
                              border: "2px solid silver",
                            }}
                          >
                            Опсисание: <br />
                            {i.description}
                          </Typography>
                        </Grid>
                        <Grid style={{ paddingRight: "10px" }}>
                          <Grid></Grid>
                          <Grid
                            style={{
                              paddingRight: "10px",
                              paddingBottom: "10px",
                            }}
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid style={{ marginTop: "10px" }}>
                              <Typography
                                variant="body2"
                                gutterBottom
                                color="textSecondary"
                                style={{
                                  fontSize: "18px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Добавлено:{" "}
                                {new Date(i.creat_date).toLocaleDateString()}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Button
                                variant="contained"
                                fullWidth={true}
                                style={{ marginTop: "10px" }}
                              >
                                В избранное
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Paper>
      );
    }
  }
}

export default ListOfProducts;
