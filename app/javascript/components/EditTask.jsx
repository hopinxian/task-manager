import React from "react";
import { Link } from "react-router-dom";

class EditTask extends React.Component {
    constructor(props) {
        super(props);

        //state stores the current details of the edited task
        this.state = {
            title: "",
            description: "",
            deadline: new Date(),
            tag: "",
            completed: false
        } ;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
        this.addHtmlEntities = this.addHtmlEntities.bind(this);
    }

    //retrieves existing data of task being edited so as to display it
    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/show/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState(response))
            .catch(() => this.props.history.push("/taskslist"));
    }

    //replacing < and > characters with their escaped value so as to not store raw HTML in database
    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    //updates changes in task details inside the state
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //saves the new task details into the database
    onSubmit(event) {
        event.preventDefault();
        const {
            match: {
                params: { id }
            }
        } = this.props;
        const url = `/update/${id}`;

        const { title, description, deadline, tag, completed } = this.state;

        if (title.length === 0 || description.length === 0)
            return;

        const body = {
            title,
            description: this.stripHtmlEntities(
                description.replace(/\n/g, "<br> <br>")
            ),
            deadline,
            tag,
            completed
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "PATCH",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/task/${response.id}`))
            .catch(error => console.log(error.message));
    }

    //adds back < and > characters
    addHtmlEntities(str) {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    render() {
        const { title, description, deadline, tag, completed} = this.state;
        const taskInstruction = this.addHtmlEntities(description);

        return (
            <div className="container my-4">
                <div className="col-sm-12 col-lg-8 offset-lg-2">
                    <h1 className="mb-4">
                        Edit Task
                    </h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                required
                                onChange={this.onChange}
                                value={title}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <input
                                type="text"
                                name="tag"
                                className="form-control"
                                onChange={this.onChange}
                                value={tag}
                            />
                        </div>
                        <div className="form-group">
                            <label>Deadline</label>
                            <input
                                required
                                type="date"
                                name="deadline"
                                className="form-control"
                                onChange={this.onChange}
                                value={deadline}
                            />
                        </div>
                        <label>Task Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="5"
                            required
                            onChange={this.onChange}
                            value={taskInstruction}
                        />
                        <button type="submit" className="btn custom-button mt-3">
                            Edit Task
                        </button>
                        <Link to="/taskslist" className="btn btn-link mt-3">
                            Back to tasks list
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditTask;
