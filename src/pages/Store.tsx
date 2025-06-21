
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Search, Filter, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  unit: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Store = () => {
  const { toast } = useToast();
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Apples',
      price: 3.99,
      category: 'Fruits',
      image: '/placeholder.svg',
      description: 'Fresh red apples, perfect for snacking',
      stock: 50,
      unit: 'lb'
    },
    {
      id: '2',
      name: 'Organic Bananas',
      price: 2.49,
      category: 'Fruits',
      image: '/placeholder.svg',
      description: 'Organic yellow bananas, rich in potassium',
      stock: 30,
      unit: 'bunch'
    },
    {
      id: '3',
      name: 'Whole Milk',
      price: 4.29,
      category: 'Dairy',
      image: '/placeholder.svg',
      description: 'Fresh whole milk, 1 gallon',
      stock: 25,
      unit: 'gallon'
    },
    {
      id: '4',
      name: 'Sourdough Bread',
      price: 5.99,
      category: 'Bakery',
      image: '/placeholder.svg',
      description: 'Freshly baked sourdough bread',
      stock: 15,
      unit: 'loaf'
    },
    {
      id: '5',
      name: 'Chicken Breast',
      price: 8.99,
      category: 'Meat',
      image: '/placeholder.svg',
      description: 'Fresh boneless chicken breast',
      stock: 20,
      unit: 'lb'
    },
    {
      id: '6',
      name: 'Spinach',
      price: 2.99,
      category: 'Vegetables',
      image: '/placeholder.svg',
      description: 'Fresh baby spinach leaves',
      stock: 35,
      unit: 'bag'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  useEffect(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const getCartItemQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">FreshMart</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md bg-gray-200"
                />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <CardDescription className="text-sm text-gray-600 mb-3">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">per {product.unit}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Stock: {product.stock} {product.unit}s
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                {getCartItemQuantity(product.id) > 0 ? (
                  <div className="flex items-center justify-between w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 font-semibold">
                      {getCartItemQuantity(product.id)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
            <h3 className="font-semibold mb-2">Cart Summary</h3>
            <div className="space-y-1 text-sm">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
