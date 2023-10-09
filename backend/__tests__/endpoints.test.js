const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const app = require("../index");
const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("testcases for checking signup endpoint", () => {
    //this afterall function will delete user once all testcases are completed
  afterAll(async () => {
    await User.deleteOne({ email: "test@test.com" });
  });

  describe("testcase for checking signup endpoint", () => {

    test("it should register a new user", async () => {

      const userData = {
        name: "test user",
        email: "test@test.com",
        password: "12345",
      };

      //mock databse function for verifying save function

      jest.spyOn(User.prototype, "save").mockResolvedValueOnce({

        //it is a mock data for verifing that actual data will look like this
        _id: "64b7f7b459ce5b5fecad83a7",
        email: "test@test.com",
        name: "test user",
        password:
          "$2b$10$vvx4E1kb5xOVqr4yCUgNfucHAne.O8C7bkwfg0DH2eRXHIC.1OOFK",
        __v: 0,
      });

      const response = await request(app)
        .post("/user/signup")
        .send(userData)
        .expect(201);

      expect(response._body.message).toBe("User Registered successfully!");

    });

    test("should give approporiate response if it fails to register a new user", async () => {

    //mock databse function for verifying save function
      jest
        .spyOn(User.prototype, "save")
        .mockRejectedValueOnce(new Error("Failed to create user"));

      const userData = {
        email: "test@test.com",
        name: "test user",
        password: "12345",
      };

      const response = await request(app)
        .post("/user/signup")
        .send(userData)
        .expect(500);
      expect(response._body.message).toBe("Something went wrong!");
    });

  });

  describe("testcases for checking login endpoint", () => {

    test("should show error if mongoDB call fails", async () => {
      const userData = {
        email: "test@test.com",
        password: "12345",
      };

      // Intentionally making user.findOne call fail. So, it will go to catch block of this.
      jest.spyOn(User, "findOne").mockRejectedValueOnce(new Error("failed"));

      const response = await request(app)
        .post("/user/login")
        .send(userData)
        .expect(500);

      expect(response._body.message).toBe("Internal Server Error!");

    });

    test("should authenticate a user and return a token", async () => {

      const userData = {
        email: "test@test.com",
        password: "12345",
      };

      //mock function for verifying findone function
      jest.spyOn(User, "findOne").mockResolvedValueOnce({
        name: "test user",
        email: "test@test.com",
      });

      //mock function for verifying jwt compare function

      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);

      const response = await request(app)
        .post("/user/login")
        .send(userData)
        .expect(200);
      // console.log(response._body);

      //verifying that findone function is called
      expect(User.findOne).toHaveBeenCalled();

      //verifying that bcrypt compare function is called
      expect(bcrypt.compare).toHaveBeenCalled();

      expect(response._body.message).toBe("Success");
      expect(response._body.token).toBeDefined();
      expect(response._body.user).toBeDefined();
    });
  });
});

describe("testcases for checking task endpoints apis", () => {

    
  test("should create a new task", async () => {
    const taskData = {
      title: "test title",
      description: "test description",
      author: "test@test.com",
    };
    const token = "testtoken";

    //mock function for verifying jwt verify function

    jest.spyOn(jwt, "verify").mockResolvedValueOnce({
      email: "test@test.com",
    });

    //mock fun for verifying save function

    jest.spyOn(Task.prototype, "save").mockResolvedValueOnce({});
    const response = await request(app)
      .post("/task/create")
      .set("Authorization", token)
      .send(taskData)
      .expect(201);

    expect(response._body.message).toBe("Task Created");
  });

  test("should get all tasks", async () => {
    const token = "testtoken";

    //mock fun for verifying jwt verify function

    jest.spyOn(jwt, "verify").mockResolvedValueOnce({
      email: "test@test.com",
    });

    jest.spyOn(Task, "find").mockResolvedValueOnce({});
    const response = await request(app)
      .get("/task/gettasks")
      .set("Authorization", token)
      .expect(200);

    expect(response._body.message).toBe("Tasks Fetched Successfully!");
  });

  test("should update a tasks", async () => {
    const token = "testtoken";

    const taskUpdateData = {
      title: "test title",
      description: "test description",
      author: "test@test.com",
    };

    //dummy id for mock updation
    const id = "dummyID";

    //mock fun for verifying jwt verify function
    jest.spyOn(jwt, "verify").mockResolvedValueOnce({
      email: "test@test.com",
    });

    jest.spyOn(Task, "findOneAndUpdate").mockResolvedValueOnce({
      title: "updated test title",
      description: "updated test description",
      author: "test@test.com",
    });

    const response = await request(app)
      .put(`/task/updatetask/${id}`)
      .set("Authorization", token)
      .send(taskUpdateData)
      .expect(201);

    expect(response._body.message).toBe("Task Updated Succesfully!");
  });

  test("should delete a tasks", async () => {
    
    const token = "testtoken";

    //dummy id for mock deletion

    const id = "dummyID";
    
    //mock fun for verifying jwt verify function

    jest.spyOn(jwt, "verify").mockResolvedValueOnce({
      email: "test@test.com",
    });

    jest.spyOn(Task, "findOneAndDelete").mockResolvedValueOnce({});

    const response = await request(app)
      .delete(`/task/deletetask/${id}`)
      .set("Authorization", token)
      .expect(201);

    expect(response._body.message).toBe("Task Deleted Successfully!");
  });
});
