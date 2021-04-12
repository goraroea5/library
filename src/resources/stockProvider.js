import HttpRequest from "./httpRequest";

class stockProvider extends HttpRequest {
  getAllBook() {
    return this.get("/stock");
  }
  getBookById(id) {
    return this.get(`/stock/${id}`);
  }
  addBook(data) {
    return this.post("/stock", data);
  }
  editBookById(id, data) {
    return this.put(`/stock/${id}`, data);
  }
  deleteBookById(id) {
    return this.delete(`/stock/${id}`);
  }
}

export default stockProvider;
