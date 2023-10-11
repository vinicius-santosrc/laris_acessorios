import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './style/style.css'

//PAGES

import Index from './pages/Index';
import Pratas from './pages/Pratas';
import Cetim from './pages/Cetim';
import Micangas from './pages/Micangas';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import Promocoes from './pages/Promocoes';
import Checkout from './pages/Checkout';
import DuvidasFrequentes from './pages/institucional/DuvidasFrequentes';
import PrivacidadeSeguranca from './pages/Privacidade-Seguranca';
import GuiaAneis from './pages/institucional/guia-de-tamanhos/GuiaAneis';
import GuiaColares from './pages/institucional/guia-de-tamanhos/GuiaColares';
import GuiaPulseiras from './pages/institucional/guia-de-tamanhos/GuiaPulseiras';
import GuiaTornozeleiras from './pages/institucional/guia-de-tamanhos/GuiaTornozeleiras';
import CuidadoJoias from './pages/institucional/CuidadoJoias';
import FaleConosco from './pages/institucional/FaleConosco';
import NovidadesPage from './pages/NovidadesPage';
import SucessoPage from './pages/SucessoPage';
import AdminLogin from './pages/AdminLogin';
import AdminProductsAdd from './pages/AdminProductsAdd';
import AdminProductEditPage from './pages/AdminProductEditPage';
import AddProducts from './pages/AddProducts';
import Errors from './pages/Erros';
import AdminPlanilhas from './pages/AdminPlanilhas';
import AdminPlanilhasPlanilha from './pages/AdminPlanilhasPlanilha';
import AdminPedidos from './pages/AdminPedidos';

//SCRIPTS
function App() {
  const isLoggedIn = localStorage.getItem('accessToken');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Index />}></Route>

          <Route path='/pratas' element={<Pratas />}></Route>
          <Route path='/pratas-colares' element={<Pratas />}></Route>
          <Route path='/pratas-brincos' element={<Pratas />}></Route>
          <Route path='/pratas-aneis' element={<Pratas />}></Route>
          <Route path='/pratas-pulseiras' element={<Pratas />}></Route>
          <Route path='/pratas-braceletes' element={<Pratas />}></Route>
          <Route path='/pratas-tornozeleiras' element={<Pratas />}></Route>
          <Route path='/pratas-piercing' element={<Pratas />}></Route>

          <Route path='/cetim' element={<Cetim />}></Route>
          <Route path='/cetim-scrunchie' element={<Cetim />}></Route>
          <Route path='/cetim-toucas' element={<Cetim />}></Route>

          <Route path='/micangas' element={<Micangas />}></Route>
          <Route path='/micangas-colares' element={<Micangas />}></Route>
          <Route path='/micangas-chockers' element={<Micangas />}></Route>
          <Route path='/micangas-pulseiras' element={<Micangas />}></Route>
          <Route path='/micangas-phone-strap' element={<Micangas />}></Route>
          <Route path='/micangas-chaveiros' element={<Micangas />}></Route>

          <Route path='/produto/:product' element={<ProductPage />}></Route>

          <Route path='/admin' element={<AdminPage />}></Route>
          <Route path='/admin/login' exact element={<AdminLogin />}></Route>
          <Route path='/admin/products' element={<AdminProductsAdd />}></Route>
          <Route path='/admin/planilhas' element={<AdminPlanilhas />}></Route>
          <Route path='/admin/planilhas/:planilha' element={<AdminPlanilhasPlanilha />}></Route>
          <Route path='/admin/products/add' element={<AddProducts />}></Route>
          <Route path='/admin/products/:product' element={<AdminProductEditPage />}></Route>
          <Route path='/admin/pedidos' element={<AdminPedidos />}></Route>

          <Route path='/promocoes' element={<Promocoes />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/novidades' element={<NovidadesPage />}></Route>

          <Route path='/errors' element={<Errors />}></Route>

          <Route path='/institucional/duvidas-frequentes' element={<DuvidasFrequentes />}></Route>
          <Route path='/pages/privacidade-seguranca' element={<PrivacidadeSeguranca />}></Route>

          <Route path='/institucional/guia-de-tamanhos/aneis' element={<GuiaAneis />}></Route>
          <Route path='/institucional/guia-de-tamanhos/colares' element={<GuiaColares />}></Route>
          <Route path='/institucional/guia-de-tamanhos/pulseiras' element={<GuiaPulseiras />}></Route>
          <Route path='/institucional/guia-de-tamanhos/tornozeleiras' element={<GuiaTornozeleiras />}></Route>

          <Route path='/institucional/cuidado-joias' element={<CuidadoJoias />}></Route>
          <Route path='/institucional/fale-conosco' element={<FaleConosco />}></Route>
          <Route path='/sucesso' element={<SucessoPage />}></Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
