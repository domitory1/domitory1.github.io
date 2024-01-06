import React from 'react';

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div class={'cardProduct'} id={product.id}>
			<picture><img src="static/img/Завтраки/Вафли творожные.jpeg" alt="изображение"/></picture>
			<h3 id={'nameProduct'}>{product.title}</h3>
			<p id={'descriptionProduct'}>{product.description}</p>
			<div class={'btnEnable'}>
				<div class={'btn-space'}>
					<button class={'buttonAddToBasket'}>{product.price}</button>
				</div>
			</div>
	    </div>
    );
};