class RodadaSerializer < ActiveModel::Serializer
  attributes :id, :valor, :numero, :data_fim ,:partidas, :comissao, :divisao, :valor_bilhete, :finalizada, :lucro

  def partidas
    self.object.partidas.map do |partida|
    {
        mandante: partida.mandante,
        visitante: partida.visitante,
        resultado: partida.resultado
    }
    end
  end
end
