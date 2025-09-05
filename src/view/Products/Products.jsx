import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", description: "" });
    const [alert, setAlert] = useState({ type: "", message: "" });

    const getProducts = async () => {
        try {
            const productoCollection = await getDocs(collection(db, "products"));
            const productsData = [];
            productoCollection.forEach((doc) => {
                productsData.push({ id: doc.id, ...doc.data() });
            });
            setProducts(productsData);
            console.log(productsData);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const addProduct = async (product) => {
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name: product.name,
                price: product.price,
                description: product.description
            });
            setAlert({ type: "success", message: "¡Producto agregado correctamente!" });
            console.log("Producto agregado:", { id: docRef.id, ...product });
            getProducts();
        } catch (error) {
            setAlert({ type: "danger", message: "Error al agregar producto: " + error.message });
            console.error("Error al agregar producto:", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name && form.price && form.description) {
            addProduct(form);
            setForm({ name: "", price: "", description: "" });
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container">
            <h2>Productos</h2>
            {alert.message && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => setAlert({ type: "", message: "" })}></button>
                </div>
            )}
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            placeholder="Precio"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Descripción"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-success w-100">Agregar</button>
                    </div>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
