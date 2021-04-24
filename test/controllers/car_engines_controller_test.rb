require "test_helper"

class CarEnginesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_engine = car_engines(:one)
  end

  test "should get index" do
    get car_engines_url
    assert_response :success
  end

  test "should get new" do
    get new_car_engine_url
    assert_response :success
  end

  test "should create car_engine" do
    assert_difference('CarEngine.count') do
      post car_engines_url, params: { car_engine: { engine_type: @car_engine.engine_type } }
    end

    assert_redirected_to car_engine_url(CarEngine.last)
  end

  test "should show car_engine" do
    get car_engine_url(@car_engine)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_engine_url(@car_engine)
    assert_response :success
  end

  test "should update car_engine" do
    patch car_engine_url(@car_engine), params: { car_engine: { engine_type: @car_engine.engine_type } }
    assert_redirected_to car_engine_url(@car_engine)
  end

  test "should destroy car_engine" do
    assert_difference('CarEngine.count', -1) do
      delete car_engine_url(@car_engine)
    end

    assert_redirected_to car_engines_url
  end
end
