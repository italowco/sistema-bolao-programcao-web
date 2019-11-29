class ApostaFolhaSerializer < ActiveModel::Serializer
  attributes :id, :numero, :rodada_id, :bilhetes, :user_id

  def bilhetes
    self.object.bilhetes.map do | bilhete |
      {
        id: bilhete.id,
        resultado: bilhete.resultado,
        partida: PartidaSerializer.new(bilhete.partida)
      }
    end
  end

end
