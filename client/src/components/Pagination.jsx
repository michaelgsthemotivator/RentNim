export default function Pagination({ currentPage, previous, next }) {
  return (
    <>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <button onClick={previous} className="page-link">
              Previous
            </button>
          </li>
          <li className="page-item">
            <div className="page-link">{currentPage}</div>
          </li>

          <li className="page-item">
            <button className="page-link" onClick={next}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
