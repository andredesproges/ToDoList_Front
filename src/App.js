import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    ToDoListe: {
      tache: "",
      done: "",
      active: ""
    }
  };

  chargerToDoList = () => {
    axios.get("http://localhost:3000/").then(response => {
      this.setState({
        ToDoListe: response.data
      });
      console.log(this.state.ToDoListe);
    });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    if (
      this.state.tache === undefined ||
      this.state.tache === null ||
      this.state.tache === ""
    ) {
      return alert("Veuillez entrer une tâche !");
    }
    axios
      .post("http://localhost:3000/create", {
        tache: this.state.tache,
        done: false,
        active: true
      })
      .then(response => {
        this.chargerToDoList();
        this.setState({
          tache: ""
        });
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const NewToDoList = [];
    for (let i = 0; i < this.state.ToDoListe.length; i++) {
      if (this.state.ToDoListe[i].done === true) {
        NewToDoList.push(
          <div className="ul_Liste">
            <span
              onClick={() => {
                axios
                  .post("http://localhost:3000/delete", {
                    tache: this.state.ToDoListe[i].tache
                  })
                  .then(response => {
                    this.chargerToDoList();
                  })
                  .catch(err => {
                    alert(err);
                  });
              }}
            >
              X
            </span>
            <span
              onClick={() => {
                axios
                  .post("http://localhost:3000/update", {
                    tache: this.state.ToDoListe[i].tache
                  })
                  .then(response => {
                    this.chargerToDoList();
                  })
                  .catch(err => {
                    alert(err);
                  });
              }}
            >
              <s>{this.state.ToDoListe[i].tache}</s>
            </span>
          </div>
        );
      } else {
        NewToDoList.push(
          <div className="ul_Liste">
            <span
              onClick={() => {
                axios
                  .post("http://localhost:3000/delete", {
                    tache: this.state.ToDoListe[i].tache
                  })
                  .then(response => {
                    this.chargerToDoList();
                  })
                  .catch(err => {
                    alert(err);
                  });
              }}
            >
              X
            </span>
            <span
              onClick={() => {
                axios
                  .post("http://localhost:3000/update", {
                    tache: this.state.ToDoListe[i].tache
                  })
                  .then(response => {
                    this.chargerToDoList();
                  })
                  .catch(err => {
                    alert(err);
                  });
              }}
            >
              {this.state.ToDoListe[i].tache}
            </span>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="Container_Principal">
          <form onSubmit={this.onSubmit}>
            <h1>ToDoList</h1>
            <ul>{NewToDoList}</ul>
            <input
              className="New_Item"
              type="text"
              placeholder="Titre"
              id="tache"
              name="tache"
              value={this.state.tache}
              onChange={this.handleChange}
            />
            <button className="Ajouter" type="submit">
              AJOUTER UNE TÂCHE
            </button>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.chargerToDoList();
  }
}

export default App;
