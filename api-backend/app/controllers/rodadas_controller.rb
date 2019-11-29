class RodadasController < ApplicationController
  before_action :set_rodada, only: [:show, :update, :destroy]
  skip_before_action :authenticate_request, only:  [:index, :show]


  # GET /rodadas
  def index
    @rodadas = Rodada.all
    render json: @rodadas.to_json
  end

  # GET /rodadas/1
  def show
    render json: @rodada
  end

  # POST /rodadas
  def create
    @rodada = Rodada.new(rodada_params)

    if @rodada.save
      logger.debug "#{params[:rodada][:partidas]}"
      render json: @rodada, status: :created, location: @rodada
    else
      render json: @rodada.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rodadas/1
  def update
    if @rodada.update(rodada_params)
      render json: @rodada
    else
      render json: @rodada.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rodadas/1
  def destroy
    @rodada.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rodada
      @rodada = Rodada.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def rodada_params
      params.require(:rodada).permit(:numero, :valor, :data_fim, :divisao, :resultado, :valor_bilhete, :comissao, :finalizada, :lucro, partidas: [:mandante_id, :visitante_id])
    end
end
