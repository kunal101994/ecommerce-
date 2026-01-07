
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
          {product.category}
        </div>
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
        
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-900 hover:text-white"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="font-semibold text-lg hover:text-indigo-600 cursor-pointer transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <span className="font-bold text-slate-900">${product.price.toLocaleString()}</span>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star text-xs ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200'}`}
            ></i>
          ))}
          <span className="text-xs text-slate-400 ml-1">({product.rating})</span>
        </div>

        <button 
          onClick={() => onViewDetails(product)}
          className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
