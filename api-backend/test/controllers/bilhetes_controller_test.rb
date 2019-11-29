require 'test_helper'

class BilhetesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bilhete = bilhetes(:one)
  end

  test "should get index" do
    get bilhetes_url, as: :json
    assert_response :success
  end

  test "should create bilhete" do
    assert_difference('Bilhete.count') do
      post bilhetes_url, params: { bilhete: { numero: @bilhete.numero, partida_id: @bilhete.partida_id, resultado: @bilhete.resultado, rodada_id: @bilhete.rodada_id } }, as: :json
    end

    assert_response 201
  end

  test "should show bilhete" do
    get bilhete_url(@bilhete), as: :json
    assert_response :success
  end

  test "should update bilhete" do
    patch bilhete_url(@bilhete), params: { bilhete: { numero: @bilhete.numero, partida_id: @bilhete.partida_id, resultado: @bilhete.resultado, rodada_id: @bilhete.rodada_id } }, as: :json
    assert_response 200
  end

  test "should destroy bilhete" do
    assert_difference('Bilhete.count', -1) do
      delete bilhete_url(@bilhete), as: :json
    end

    assert_response 204
  end
end
