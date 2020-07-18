export default class User {
  embagoMonth: number;
  id: string;
  username: string;

  constructor(user: { embagoMonth: number; id: string; username: string }) {
    this.embagoMonth = user.embagoMonth;
    this.id = user.id;
    this.username = user.username;

    if (typeof user.embagoMonth === "number") {
      this.embagoMonth = user.embagoMonth;
    }
  }

  isNew() {
    console.log(this.embagoMonth);
    return this.embagoMonth === null;
  }
}
