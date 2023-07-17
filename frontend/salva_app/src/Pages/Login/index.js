import { useNavigate } from "react-router-dom";
import './_index.css'
import logo from '../../images/branding/logotype_small.png';
import AnimatedForm from "../../Components/AnimatedForm";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login bg-dash container-fluid">
      
      <div className="row h-100">
        <div className="col"></div>

        <div className="col d-flex justify-content-center flex-column">
          
          <div className="card shadow border-0 rounded-4 login-card">
            <div className="card-body py-8 px-10">
              {/* LOGO */}
              <img src={logo} className="login-logo" alt="logo" />

              {/* TITLE */}
              <h3 className="mb-8 poppins fw-semibold">Entre na sua conta</h3>


              <div className="loginForm work-sans">
                <AnimatedForm formType={'email'} formPlaceholder={'Nome de Usuário'}/>
                <AnimatedForm formType={'password'} formPlaceholder={'Senha'}/>

                {/* SIGN IN */}
                <button type="submit" class="btn btn-primary mt-3 w-100 rounded-pill" onClick={() => navigate('/chamado')}>Entrar</button>
                <div className="w-100 text-center mt-2">
                  <small>
                    <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Esqueceu sua credencial?
                    <i class="bi bi-arrow-up-right ms-1 small"></i>
                    </a>
                  </small>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="col"></div>
      </div>
    </div>
  );
}

export default Login;
