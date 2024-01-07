import React from 'react';

const ProductItem = ({product, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div class={'cardProduct' + product.category} id={'1'}>
			<picture><img src='static/img/Завтраки/Вафли творожные.jpeg' alt='изображение'/></picture>
			<h3 id={'nameProduct'} >{product.name}</h3>
			<p id={'descriptionProduct'}>{product.description}</p>
			<div class={'btnEnable'}>
				<div class={'btn-space'}>
					<button class={'buttonAddToBasket'} onClick={onAddHandler}>{product.price}</button>
				</div>
			</div>
		</div>
    );
};