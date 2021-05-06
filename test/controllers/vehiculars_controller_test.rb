require "test_helper"

class VehicularsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vehicular = vehiculars(:one)
  end

  test "should get index" do
    get vehiculars_url
    assert_response :success
  end

  test "should get new" do
    get new_vehicular_url
    assert_response :success
  end

  test "should create vehicular" do
    assert_difference('Vehicular.count') do
      post vehiculars_url, params: { vehicular: { message: @vehicular.message } }
    end

    assert_redirected_to vehicular_url(Vehicular.last)
  end

  test "should show vehicular" do
    get vehicular_url(@vehicular)
    assert_response :success
  end

  test "should get edit" do
    get edit_vehicular_url(@vehicular)
    assert_response :success
  end

  test "should update vehicular" do
    patch vehicular_url(@vehicular), params: { vehicular: { message: @vehicular.message } }
    assert_redirected_to vehicular_url(@vehicular)
  end

  test "should destroy vehicular" do
    assert_difference('Vehicular.count', -1) do
      delete vehicular_url(@vehicular)
    end

    assert_redirected_to vehiculars_url
  end
end
