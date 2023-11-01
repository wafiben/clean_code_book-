class Entity {
  title: string;
  description: string;
  ymdhm: string;
  constructor(title: string, description: string, ymdhm: string) {
    this.title = title;
    this.description = description;
    this.ymdhm = ymdhm;
  }
}

function output(item): void {
  console.log("Title: " + item.title);
  console.log("Description: " + item.description);
  console.log("Published: " + item.ymdhm);
}

const summary: string = "Clean Code Is Great!";
const desc: string =
  "Actually, writing Clean Code can be pretty fun. You'll see!";
const ymdhm: Date = new Date();
/* Mon Aug 21 2023 18:44:02 GMT+0100 (heure normale d’Europe centrale) */
const date: string = ymdhm.toString().slice(0, 16).replace("T", " ");
/* 2023-08-21 17:44 */

const item: Entity = new Entity(summary, desc, date);

output(item);

/* refactor */

class BlogPost {
  title: string;
  description: string;
  dateOfPublishement: string;

  constructor(blogPost: BlogPost) {
    this.title = blogPost.title;
    this.description = blogPost.description;
    this.dateOfPublishement = blogPost.dateOfPublishement;
  }
}

const dateNow: Date = new Date();
/* Mon Aug 21 2023 18:44:02 GMT+0100 (heure normale d’Europe centrale) */
const formattedDate: string = dateNow.toString().slice(0, 16).replace("T", " ");

class BlogComponent {
  formatDate(date: Date): string {
    return date.toString().slice(0, 16).replace("T", " ");
  }
  newBlog = new BlogPost({
    title: "Clean Code Is Great!",
    description: "Actually, writing Clean Code can be pretty fun. You'll see!",
    dateOfPublishement: this.formatDate(new Date()),
  });
}

/* ________________________________________________________ */

/* !!eviter d'utiliser beacoup beacoup de parametres en constructor */
/* make always abstraction ==>leave the class only with constructor */
/* attribute proprety prononceable date  */
/* write long name that is comprehensible */
/* comment are not good habit only when you are developing in library */
/* isValidated  ,hasOwnProprety */

/* ______________________________________________________________________ */
/* _________________________________ */
/* todo */ 
/* 5 chapitre clean code bernared mayer  */


