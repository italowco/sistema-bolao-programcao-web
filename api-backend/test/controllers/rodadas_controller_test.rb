require 'test_helper'

class RodadasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rodada = rodadas(:one)
  end

  test "should get index" do
    get rodadas_url, as: :json
    assert_response :success
  end

  test "should create rodada" do
    assert_difference('Rodada.count') do
      post rodadas_url, params: { rodada: { numero: @rodada.numero, valor: @rodada.valor } }, as: :json
    end

    assert_response 201
  end

  test "should show rodada" do
    get rodada_url(@rodada), as: :json
    assert_response :success
  end

  test "should update rodada" do
    patch rodada_url(@rodada), params: { rodada: { numero: @rodada.numero, valor: @rodada.valor } }, as: :json
    assert_response 200
  end

  test "should destroy rodada" do
    assert_difference('Rodada.count', -1) do
      delete rodada_url(@rodada), as: :json
    end

    assert_response 204
  end
end
