import { useEffect, useState } from "react";
import Bundle from "../models/Bundle";
import { getBundleList } from "../service/BundleService";
import User from "../dto/User";

export default function Bundles(props: { authState: { token: string, user: User } | null }) {

    const [bundles, setBundles] = useState<Bundle[] | null>(null);

    useEffect(() => {
        getBundleList().then(bundles => setBundles(bundles));
        console.log(bundles);
    }, []);



    let userDiscount = 1;
    if (props.authState !== null) {
        userDiscount = props.authState?.user.golden ? 0.75 : 0.9;
    }

    return (
        <section className="container text-white text-center">
            <h1>Bundles</h1>
            <ul className="list-unstyled">
                {
                    bundles?.map(bundle =>
                        <li className="mt-5 mx-auto mb-3">
                            <h2>{bundle.name}</h2>

                            <h3 className="mt-2">Items in this bundle:</h3>
                            <ul className="list-unstyled text-left">
                                {
                                    bundle.bundleItems.map(bundleItem => <li>{bundleItem.name}</li>)
                                }
                            </ul>
                            <p>
                                <del>{bundle.bundleItems.map(b => b.price).reduce((p1, p2) => p1 + p2).toFixed(2)}$</del><br />
                                <span>{100 - bundle.discount * 100}% Off (Bundle discount)</span><br />
                                <span style={{ color: '#F9C448' }}>{100 - userDiscount * 100}% Off (User discount)</span><br />
                                <u>{(bundle.bundleItems.map(b => b.price).reduce((p1, p2) => p1 + p2) * bundle.discount * userDiscount).toFixed(2)}$</u>
                            </p>

                        </li>)
                }
            </ul>
        </section>
    );
}