import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, Button, Card, Spinner, Toast } from "react-bootstrap";
import Header from "../../components/head";


export default function About({ data, error: err, loading: load }) {
    const Router = useRouter()
    const id = Router.query.id


    const [error, setError] = useState(err ? err : null)
    const [loading, setLoading] = useState(load)
    const [fData, setFData] = useState(data)
    const [search, setSearch] = useState('')

    const get = async (e, search) => {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://api.postalpincode.in/pincode/${search}`).catch(err => setError(err))
        if (res) {
            const fetchdata = await res.json()

            setLoading(false)

            return setFData(fetchdata)
        }
        setLoading(false)
        return null

    }


    return (
        <>
            <Head>
                <title>{ loading ? "Wait..." : "Search Pincode" }</title>
                <meta property="og:title" content="Search PIN code" key="title" />
            </Head>
            <Header />
            <div style={ { display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" } }>

                <main className='main' >
                    <div className='search'>
                        <input type="number" placeholder="Search Pincode " value={ search } onChange={ (e) => setSearch(e.target.value) } />
                        <Button varient="success" onClick={ (e) => get(e, search) } >Search</Button>
                    </div>




                    {

                        loading ? <Spinner variant="success" animation="border" /> :
                            error !== null ?
                                <Toast show={ error } style={ { backgroundColor: "#fcf" } } key={ error } >
                                    <Toast.Header closeButton={ false }>
                                        <strong className="me-auto">Error</strong>
                                    </Toast.Header>
                                    <Toast.Body>Something went wrong ...!</Toast.Body>
                                </Toast> :
                                !fData || fData === null || fData === [] ?
                                    <h5>Please Search a pincode</h5>
                                    :


                                    fData.map(x =>
                                        x.Status === "Error" || x.Status === "404" ?
                                            <Alert variant="danger" className="card-body" >{ x.Message }</Alert>
                                            :
                                                x.PostOffice.map((item ,ind) =>

                                                    <Card key={ ind } style={ { width: 350, marginBottom: 30, background: "#a6f1bd" } } >
                                                        <Card.Body >
                                                            <Card.Header style={ { height: "200px", backgroundColor: "transperent" } }>
                                                                <h3 style={ { color: "#927148", fontWeight: "bold" } } >PINCODE : { item.Pincode }</h3>
                                                                <h1 style={ { color: "green", fontWeight: "bold" } }  >{ item.Name }</h1>
                                                            </Card.Header>
                                                            <Card.Text style={ { display: "flex", textAligh: "center", textOverflow: "ellipsis", flexDirection: "row" } } >
                                                                <b>Branch: </b><text>  { item.BranchType }{ "(" }{ item.Circle }{ ")" }</text>
                                                            </Card.Text>
                                                            <Card.Text style={ { display: "flex", textAligh: "center", textOverflow: "ellipsis", flexDirection: "row" } } >
                                                                <b>State (circle) : </b><text>  { item.State }{ "(" }{ item.Circle }{ ")" }</text>
                                                            </Card.Text>
                                                            <Card.Text style={ { display: "flex", textAligh: "center", textOverflow: "ellipsis", flexDirection: "row" } } >
                                                                <b> District : </b><text>  { item.District }</text>
                                                            </Card.Text>
                                                            <Card.Text style={ { display: "flex", textAligh: "center", textOverflow: "ellipsis", flexDirection: "row" } } >
                                                                <b> Division : </b><text>  { item.Division }</text>
                                                            </Card.Text>
                                                            <Card.Text style={ { display: "flex", textAligh: "center", textOverflow: "ellipsis", flexDirection: "row" } } >
                                                                <b>Region: </b><text>  { item.Region }</text>
                                                            </Card.Text>
                                                            <Card.Text style={ { display: "flex", textAligh: "center", textOverflow: "ellipsis", flexDirection: "row" } } >
                                                                <b>Delivery-Status : </b><text>{ item.DeliveryStatus }</text>
                                                            </Card.Text>
                                                        </Card.Body>

                                                    </Card>

                                                )
                                    )
                    }



                </main>
            </div>
        </>
    )
}


export async function getStaticProps(context) {

    let error;
    if (context.params.id === "id") {
        return {
            props: { data: null, loading: false },
        }

    } else {
        const res = await fetch(`https://api.postalpincode.in/pincode/${context.params.id}`).catch(err => error = err)
        console.log(res);
        if (res) {
            const data = await res.json()
            return {
                props: { data, loading: false, error: null },

            }
        }


        return {
            error: error,
            loading: false
        }
    }
}

export async function getStaticPaths(props) {

    const id = "dnijndsiu"
    return {
        paths: [
            { params: { id: id } },
        ],
        fallback: true,
    }
}