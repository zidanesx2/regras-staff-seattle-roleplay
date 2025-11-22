import React, { useState, useRef } from 'react';
import { AlertCircle, Download, FileText, UserX } from 'lucide-react';

export default function SistemaAdvertenciaStaff() {
  const [tipoAcao, setTipoAcao] = useState('advertencia');
  const [formData, setFormData] = useState({
    nomeServidor: '',
    discord: '',
    cargoAtual: 'Helper',
    idCidade: '',
    tempoStaff: '',
    dataEntrada: '',
    motivo: ''
  });
  
  const canvasRef = useRef(null);
  const [imagemGerada, setImagemGerada] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const gerarImagem = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 745;
    canvas.height = 290;
    
    const gradient = ctx.createLinearGradient(0, 0, 745, 290);
    gradient.addColorStop(0, '#2d2d2d');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 745, 290);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('DADOS DO MEMBRO PUNIDO', 20, 40);
    
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 60);
    ctx.lineTo(725, 60);
    ctx.stroke();
    
    const dados = [
      { campo: 'Nome no Servidor', info: formData.nomeServidor || '-' },
      { campo: 'Discord', info: formData.discord || '-' },
      { campo: 'Cargo Atual', info: formData.cargoAtual },
      { campo: 'ID na Cidade', info: formData.idCidade ? '#' + formData.idCidade : '-' },
      { campo: 'Tempo na Staff', info: formData.tempoStaff || '-' },
      { campo: 'Data de Entrada', info: formData.dataEntrada || '-' }
    ];
    
    let yPos = 90;
    
    for (let i = 0; i < dados.length; i++) {
      const item = dados[i];
      
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(20, yPos - 25, 705, 35);
      }
      
      ctx.fillStyle = '#aaaaaa';
      ctx.font = '16px Arial';
      ctx.fillText(item.campo, 35, yPos);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(item.info, 410, yPos);
      
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(395, yPos - 20);
      ctx.lineTo(395, yPos + 10);
      ctx.stroke();
      
      yPos += 35;
    }
    
    ctx.strokeStyle = tipoAcao === 'exoneracao' ? '#ff4444' : '#ffaa00';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 745, 290);
    
    ctx.fillStyle = tipoAcao === 'exoneracao' ? '#ff4444' : '#ffaa00';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(tipoAcao === 'exoneracao' ? 'EXONERACAO' : 'ADVERTENCIA', 560, 35);
    
    const imagemURL = canvas.toDataURL('image/png');
    setImagemGerada(imagemURL);
  };

  const baixarImagem = () => {
    if (!imagemGerada) return;
    
    const link = document.createElement('a');
    const nomeArquivo = tipoAcao + '_' + (formData.nomeServidor || 'staff').replace(/\s+/g, '_') + '_' + Date.now() + '.png';
    link.download = nomeArquivo;
    link.href = imagemGerada;
    link.click();
  };

  const limparFormulario = () => {
    setFormData({
      nomeServidor: '',
      discord: '',
      cargoAtual: 'Helper',
      idCidade: '',
      tempoStaff: '',
      dataEntrada: '',
      motivo: ''
    });
    setImagemGerada(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-t-xl p-6 border-b-4 border-purple-500">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="w-8 h-8" />
            Sistema de Advertencias e Exoneracoes
          </h1>
          <p className="text-gray-400 mt-2">Gere relatorios visuais de punicoes administrativas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Dados da Punicao
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Acao
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTipoAcao('advertencia')}
                  className={'p-3 rounded-lg font-semibold transition-all ' + (tipoAcao === 'advertencia' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600')}
                >
                  Advertencia
                </button>
                <button
                  onClick={() => setTipoAcao('exoneracao')}
                  className={'p-3 rounded-lg font-semibold transition-all ' + (tipoAcao === 'exoneracao' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600')}
                >
                  Exoneracao
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome no Servidor</label>
              <input
                type="text"
                name="nomeServidor"
                value={formData.nomeServidor}
                onChange={handleInputChange}
                placeholder="Ex: Joao Silva"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Discord</label>
              <input
                type="text"
                name="discord"
                value={formData.discord}
                onChange={handleInputChange}
                placeholder="Ex: joaosilva#3421"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Cargo Atual</label>
              <select
                name="cargoAtual"
                value={formData.cargoAtual}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Helper">Helper</option>
                <option value="Moderador">Moderador</option>
                <option value="Head Staff">Head Staff</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">ID na Cidade</label>
              <input
                type="text"
                name="idCidade"
                value={formData.idCidade}
                onChange={handleInputChange}
                placeholder="Ex: 2847"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Tempo na Staff</label>
              <input
                type="text"
                name="tempoStaff"
                value={formData.tempoStaff}
                onChange={handleInputChange}
                placeholder="Ex: 1 mes e 12 dias"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Data de Entrada</label>
              <input
                type="date"
                name="dataEntrada"
                value={formData.dataEntrada}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Motivo da Punicao</label>
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
                placeholder="Descreva o motivo da advertencia ou exoneracao..."
                rows={4}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={gerarImagem}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Gerar Imagem
              </button>
              <button
                onClick={limparFormulario}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all"
              >
                Limpar
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-green-400" />
              Preview e Download
            </h2>

            {imagemGerada ? (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border-2 border-purple-500">
                  <img 
                    src={imagemGerada} 
                    alt="Preview da punicao" 
                    className="w-full rounded"
                  />
                </div>
                
                <button
                  onClick={baixarImagem}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Baixar Imagem
                </button>

                {formData.motivo && (
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h3 className="text-sm font-bold text-yellow-400 mb-2">MOTIVO:</h3>
                    <p className="text-gray-300 text-sm">{formData.motivo}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-12 text-center border-2 border-dashed border-gray-700">
                <UserX className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Preencha o formulario e clique em Gerar Imagem</p>
                <p className="text-gray-600 text-sm mt-2">A imagem sera exibida aqui</p>
              </div>
            )}
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
}