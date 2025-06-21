
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Truck, Clock, Shield, Star, Users, Package, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your groceries delivered within 2 hours'
    },
    {
      icon: Leaf,
      title: 'Fresh Products',
      description: 'Sourced directly from local farms and suppliers'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee on all products'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Shop anytime, anywhere with our online store'
    }
  ];

  const categories = [
    { name: 'Fruits & Vegetables', count: '200+ items', color: 'bg-green-100 text-green-800' },
    { name: 'Dairy Products', count: '50+ items', color: 'bg-blue-100 text-blue-800' },
    { name: 'Meat & Seafood', count: '75+ items', color: 'bg-red-100 text-red-800' },
    { name: 'Bakery', count: '40+ items', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Beverages', count: '100+ items', color: 'bg-purple-100 text-purple-800' },
    { name: 'Snacks', count: '80+ items', color: 'bg-orange-100 text-orange-800' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality and super fast delivery! FreshMart has become my go-to grocery store.'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Love the variety and freshness of products. The mobile app makes shopping so convenient.'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Great prices and excellent customer service. Highly recommend FreshMart!'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">FreshMart</h1>
              <Badge variant="secondary" className="hidden sm:block">
                Online Grocery Store
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/store">
                <Button className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fresh Groceries
              <br />
              <span className="text-green-200">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Shop from thousands of fresh products and get them delivered to your doorstep within hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/store">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Start Shopping
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FreshMart?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best grocery shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">
              Explore our wide range of fresh products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.count}</CardDescription>
                  </div>
                  <Badge className={category.color}>
                    <Package className="h-4 w-4 mr-1" />
                    Shop
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-200">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2hrs</div>
              <div className="text-green-200">Average Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">FreshMart</h3>
              <p className="text-gray-400">
                Your trusted online grocery store delivering fresh products right to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/store" className="hover:text-white">Shop</Link></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Fruits & Vegetables</a></li>
                <li><a href="#" className="hover:text-white">Dairy Products</a></li>
                <li><a href="#" className="hover:text-white">Meat & Seafood</a></li>
                <li><a href="#" className="hover:text-white">Bakery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@freshmart.com</li>
                <li>📞 1-800-FRESH-99</li>
                <li>📍 123 Fresh Street, Food City</li>
                <li>🕒 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreshMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
