function PrimaryButton({ text, onClick }) {

    return (

        <button
            className="btn btn-primary"
            onClick={onClick}
        >

            {text}

        </button>

    );

}

export default PrimaryButton;