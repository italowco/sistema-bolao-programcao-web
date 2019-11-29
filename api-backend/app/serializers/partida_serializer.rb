class PartidaSerializer < ActiveModel::Serializer
  attributes :id, :visitante, :mandante, :resultado, :rodada_id

  def visitante_id
    {
        name: self.object.visitante_team.ids
    }
  end

  def mandante_id
    {
        name: self.object.mandante_team.ids
    }
  end
end
