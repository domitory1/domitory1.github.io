import React from 'react';
import ProductItem from "../productItem/productItem";

const products = [
    {id: '0', name: 'Вафли сырные', description: 'Две вафли с добавлением сыра в тесто, подаются с красной слабосоленой рыбой, зеленым салатом, помидорами черри, мягким творожным сыром, кедровыми орешками и соусом бальзамиком', category: 'Завтраки', price: '430'},
    {id: '1', name: 'Вафли творожные', description: 'Подаются со свежими ягодами и кусочками банана (2 шт.)', category: 'Завтраки', price: '280'},
    {id: '2', name: 'Галета на постном тесте', description: 'Постная галета на цельнозерновой муке', category: 'Завтраки', price: '250'},
    {id: '3', name: 'Гранола', description: 'Наша домашняя ореховая гранола подается с бананом, топленным с семенами ванили, грушей и свежими ягодами', category: 'Завтраки', price: '250'},
    {id: '4', name: 'Каша рисовая с соусом манго-маракуя', description: 'Рисовая каша с бананом, семенами чиа, лепестками миндаля и пюре манго-маракуя', category: 'Завтраки', price: '180'},
]

const getTotalPrice = (items) => {
    return items.reduce ((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {

    const [addedItems, setAddedItems] = useState([])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.lenght === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Корзина ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {ProductList.map(item => (
                <ProductItem
                    product={item}
                />
            ))}
        </div>
    );
};