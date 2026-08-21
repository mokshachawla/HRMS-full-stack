function PageHeader({ title, subtitle }) {

    return (

        <div className="mb-4">

            <h2>{title}</h2>

            <p className="text-muted">

                {subtitle}

            </p>

            <hr/>

        </div>

    );

}

export default PageHeader;