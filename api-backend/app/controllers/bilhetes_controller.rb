class BilhetesController < ApplicationController
  before_action :set_bilhete, only: [:show, :update, :destroy]
  skip_before_action :authenticate_request, only:  [:index, :show]


  # GET /bilhetes
  def index
    @bilhetes = Bilhete.all
    @bilhetes = @bilhetes.rodada(params[:rodada]) if params[:rodada].present?

    render json: @bilhetes
  end

  # GET /bilhetes/1
  def show
    render json: @bilhete
  end

  # POST /bilhetes
  def create
    @bilhete = Bilhete.new(bilhete_params)

    if @bilhete.save
      render json: @bilhete, status: :created, location: @bilhete
    else
      render json: @bilhete.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bilhetes/1
  def update
    if @bilhete.update(bilhete_params)
      render json: @bilhete
    else
      render json: @bilhete.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bilhetes/1
  def destroy
    @bilhete.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bilhete
      @bilhete = Bilhete.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def bilhete_params
      params.require(:bilhete).permit(:rodada_id, :partida_id, :numero, :resultado, :aposta_folha_id)
    end
end
