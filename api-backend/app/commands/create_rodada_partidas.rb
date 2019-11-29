class CreateRodadaPartidas
  prepend SimpleCommand
  attr_accessor :rodada, :partidas

  def initialize(rodada, partidas = [])
    @rodada = rodada
    partidas = partidas
  end

  def create_rodadas
    partidas.each do |partida|
      Partida.create({mandante_id: partida[:mandante], visitante_id: partida[:visitante], rodada_id: @rodada.id})
    end
  end
end
