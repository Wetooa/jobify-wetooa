import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useAppContext } from "../context/appContext";

function PageBtnContainer() {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  return (
    <Wrapper>
      <button
        className="prev-btn"
        type="button"
        onClick={() => {
          let newPage: number = page - 1;
          if (newPage < 1) newPage = numOfPages;
          changePage(newPage);
        }}
      >
        <HiChevronDoubleLeft />
      </button>

      <div className="btn-container">
        {pages.map((pageItem) => {
          return (
            <button
              type="button"
              key={pageItem}
              className={page === pageItem ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageItem)}
            >
              {pageItem}
            </button>
          );
        })}
      </div>

      <button
        className="next-btn"
        type="button"
        onClick={() => {
          let newPage: number = page + 1;
          if (newPage > numOfPages) newPage = 1;
          changePage(newPage);
        }}
      >
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}
export default PageBtnContainer;
