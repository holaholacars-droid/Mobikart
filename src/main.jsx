import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from '../Layout.jsx';
import Dashboard from './components/Dashboard.jsx';
import MarketPlace from './components/MarketPlace';
import MyOrder from './components/productdetails';
import SavedProduct from './components/SavedProduct';
import { shadesOfPurple } from '@clerk/themes';
import PostProduct from './components/PostProduct';
import ProtectedRoute from './components/ui/protected-route';
import Onboarding from './components/onboarding';
import ProductListing from './components/ProductListing';
import Checkout from './components/checkout';
import Myorders from './components/MyOrders/myorders';
import Aboutus from './components/About Us/aboutus';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="onboard" element={<ProtectedRoute><Onboarding/></ProtectedRoute>}/>
      <Route path="marketplace" element={<ProtectedRoute><MarketPlace /></ProtectedRoute>} />
      <Route path="marketorder/:id" element={<ProtectedRoute><MyOrder /></ProtectedRoute>} />
      <Route path="savedproduct" element={<ProtectedRoute><SavedProduct /></ProtectedRoute>} />
      <Route path="postproduct" element={<ProtectedRoute><PostProduct /></ProtectedRoute>} />
      <Route path="checkout/:id" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
      <Route path="jobs" element={<ProductListing/>}/>
      <Route path="myorders" element={<ProtectedRoute><Myorders/></ProtectedRoute>}/>
      <Route path="aboutus" element={<ProtectedRoute><Aboutus/></ProtectedRoute>}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
