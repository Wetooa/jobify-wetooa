"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PageBtnContainer_1 = __importDefault(require("../assets/wrappers/PageBtnContainer"));
const hi_1 = require("react-icons/hi");
const appContext_1 = require("../context/appContext");
function PageBtnContainer() {
    const { numOfPages, page, changePage } = (0, appContext_1.useAppContext)();
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });
    return (<PageBtnContainer_1.default>
      <button className="prev-btn" type="button" onClick={() => {
            let newPage = page - 1;
            if (newPage < 1)
                newPage = numOfPages;
            changePage(newPage);
        }}>
        <hi_1.HiChevronDoubleLeft />
      </button>

      <div className="btn-container">
        {pages.map((pageItem) => {
            return (<button type="button" key={pageItem} className={page === pageItem ? "pageBtn active" : "pageBtn"} onClick={() => changePage(pageItem)}>
              {pageItem}
            </button>);
        })}
      </div>

      <button className="next-btn" type="button" onClick={() => {
            let newPage = page + 1;
            if (newPage > numOfPages)
                newPage = 1;
            changePage(newPage);
        }}>
        <hi_1.HiChevronDoubleRight />
      </button>
    </PageBtnContainer_1.default>);
}
exports.default = PageBtnContainer;
