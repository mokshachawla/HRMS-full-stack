function Pagination({
                        currentPage,
                        totalPages,
                        setCurrentPage
                    }) {

    return (

        <div className="d-flex justify-content-center mt-4">

            <button
                className="btn btn-secondary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>

            {

                [...Array(totalPages)].map((_, index) => (

                    <button

                        key={index}

                        className={`btn me-2 ${
                            currentPage === index + 1
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}

                        onClick={() =>
                            setCurrentPage(index + 1)
                        }

                    >

                        {index + 1}

                    </button>

                ))

            }

            <button
                className="btn btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>

        </div>

    );

}

export default Pagination;