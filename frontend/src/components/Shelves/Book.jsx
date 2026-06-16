import "../../styles/Book.css";

function Book({title, bookKey, cover}) {
    return (
        <div>
            <img className="w-1/5" src={cover}/>
        </div>
    );
}

export default Book;
