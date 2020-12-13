import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  TextField,
  Box,
  Hidden,
} from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Delay from "react-delay"

class Userproducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      error: null,
      message: "hello",
      deleteId: 9999,
    };
  }
 
  componentDidMount() {
    fetch("http://localhost:3000/api/show_product", {
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

  delete = (e) => {
    console.log(e.target.value);
    const obj = {
      delId: e.target.value
    }
    fetch("http://localhost:3000/api/delete_user_product", {
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
    })
  };

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

  render() {
    if (this.state.error == 1) {
      return <Redirect push to="/login" />;
    } else {
      return (
        <Delay await={1000}>
        <Paper style={{ backgroundColor: "silver" }}>
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
                          src="https://storge.pic2.me/c/560x350/294/56fa78a2c61df.jpg"
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
                        </Grid>
                        <Grid style={{ paddingRight: "10px" }}>
                          <Accordion
                            style={{
                              borderLeft: "2px solid silver",
                              borderRight: "2px solid silver",
                              borderTop: "2px solid silver",
                              paddingRight: "10px",
                            }}
                          >
                            <AccordionSummary>
                              <Typography
                                color="primary"
                                style={{
                                  fontSize: "20px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Редактировать
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Container>
                                <form
                                  method="POST"
                                  action="/api/update_user_product"
                                >
                                  <Grid className="Grid" item={true} xs={10}>
                                    <TextField
                                      inputProps={{ maxLength: 30 }}
                                      name="inpFilledHeader"
                                      id="inpFilledHeader"
                                      label="Заголовок"
                                      variant="filled"
                                      fullWidth={true}
                                      type="text"
                                      defaultValue={i.header}
                                    />
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
                                        defaultValue=""
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
                                      defaultValue={i.price}
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
                                      type="text"
                                      name="inpFilledDescription"
                                      id="inpFilledDescription"
                                      label="Описание"
                                      variant="filled"
                                      defaultValue={i.description}
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
                                      value={i.id}
                                      type="submit"
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                    >
                                      Отправить
                                    </Button>
                                  </Grid>
                                </form>
                              </Container>
                            </AccordionDetails>
                          </Accordion>
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
                                component="button"
                                fullWidth={true}
                                style={{ marginTop: "10px" }}
                                value={i.id}
                                onClick={this.delete}
                              >
                                Удалить
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
      </Delay>
      );
    }
  }
}
export default Userproducts;
