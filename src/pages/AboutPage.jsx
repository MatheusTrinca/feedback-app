import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>Sobre este projeto</h1>
        <p>Este é um projeto em teste para colher avaliações</p>
        <p>Versão 1.0.0</p>
        <Link to="/">Voltar</Link>
      </div>
    </Card>
  );
}

export default AboutPage;
