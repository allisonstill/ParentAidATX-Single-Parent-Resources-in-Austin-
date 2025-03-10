import BookCard from "../components/bookCard";
import "./Books.css";


// Put data to go in cards here
const individualBookData = [
    {   id: 1, 
        title: "Book 1",
        author: "Author 1",
        publishDate: "January 1, 2022",
        pageCount: "100",
        listPrice: "$10.00",
        description: "Book about single parenting",
        cat: "Housing",
        image: "https://novapublishers.com/wp-content/uploads/2018/09/9781536132779-e1537696463162.jpg",
        link: "https://novapublishers.com/shop/single-parenting-in-the-21st-century-perceptions-issues-and-implications/"       
    },
    {   id: 2, 
        title: "Book 2",
        author: "Author 2",
        publishDate: "January 2, 2022",
        pageCount: "200",
        listPrice: "$20.00",
        description: "Book about single parenting 2",
        cat: "Food",
        image: "https://m.media-amazon.com/images/I/81jHqwFaL5L._AC_UF1000,1000_QL80_.jpg",
        link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FSingle-Parent-Confident-Successful%2Fdp%2F0764232843&psig=AOvVaw2HRvHUEpjhpKlo2-I_vjaX&ust=1741721448851000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDCvpqggIwDFQAAAAAdAAAAABAI"       
    },
    {   id: 3, 
        title: "Book 3",
        author: "Author 3",
        publishDate: "January 3, 2022",
        pageCount: "300",
        listPrice: "$30.00",
        description: "Book about single parenting 3",
        cat: "Childcare",
        image: "https://pictures.abebooks.com/isbn/9781565078604-us.jpg",
        link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.abebooks.com%2F9781565078604%2FSuccessful-Single-Parenting-Richmond-Gary-1565078608%2Fplp&psig=AOvVaw2HRvHUEpjhpKlo2-I_vjaX&ust=1741721448851000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDCvpqggIwDFQAAAAAdAAAAABAN"       
     }
  ];
const pageTitle="Books about Single Parenting";
const pageDescription= "Find many books and resources about single parenting.";
const cardData = individualBookData;

function Books(){
    return( 
        <div className="books-page-container">
            <h1 className="books-page-title">{pageTitle}</h1>
            <p className="books-page-description">{pageDescription}</p>
            <p className="books-page-description">Showing 3/3 Instances</p>
        {/* NEW WRAPPER FOR CARDS */}
        <div className="BookCards-container">
            {cardData.map((currCard) => (
                <div key={currCard.id} style={{ width: "350px" }}> {/* Adjust width as needed */}
                < BookCard
                    id={currCard.id}
                    author={currCard.author}
                    publishDate={currCard.publishDate}
                    pageCount={currCard.pageCount}
                    listPrice={currCard.listPrice}
                    description={currCard.description}
                    cat={currCard.cat}
                    link={currCard.link}
                    image={currCard.image}
                />
                </div>
            ))}
        </div>
    </div>
);
}

export default Books;