
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  unit: string;
  status: 'active' | 'inactive';
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Fresh Apples', price: 3.99, category: 'Fruits', stock: 50, unit: 'lb', status: 'active' },
    { id: '2', name: 'Organic Bananas', price: 2.49, category: 'Fruits', stock: 30, unit: 'bunch', status: 'active' },
    { id: '3', name: 'Whole Milk', price: 4.29, category: 'Dairy', stock: 25, unit: 'gallon', status: 'active' },
    { id: '4', name: 'Sourdough Bread', price: 5.99, category: 'Bakery', stock: 15, unit: 'loaf', status: 'active' },
    { id: '5', name: 'Chicken Breast', price: 8.99, category: 'Meat', stock: 20, unit: 'lb', status: 'active' },
    { id: '6', name: 'Spinach', price: 2.99, category: 'Vegetables', stock: 35, unit: 'bag', status: 'active' }
  ]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    unit: ''
  });

  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'text-blue-600' },
    { title: 'Active Products', value: products.filter(p => p.status === 'active').length, icon: ShoppingCart, color: 'text-green-600' },
    { title: 'Low Stock Items', value: products.filter(p => p.stock < 20).length, icon: Package, color: 'text-red-600' },
    { title: 'Total Value', value: `$${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}`, icon: DollarSign, color: 'text-purple-600' }
  ];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      status: 'active'
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: 0, category: '', stock: 0, unit: '' });
    setShowAddProduct(false);

    toast({
      title: "Product Added",
      description: `${product.name} has been added successfully`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory",
    });
  };

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-green-600">FreshMart Admin</h1>
            <Button 
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Product Form */}
        {showAddProduct && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Enter product details to add to inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
                <Input
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                />
                <Input
                  type="number"
                  placeholder="Stock Quantity"
                  value={newProduct.stock || ''}
                  onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                />
                <Input
                  placeholder="Unit (lb, kg, piece, etc.)"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                    Add Product
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>Manage your store's product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={product.stock < 20 ? 'text-red-600 font-semibold' : ''}>
                        {product.stock} {product.unit}s
                      </span>
                    </TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.status === 'active' ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => toggleProductStatus(product.id)}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
