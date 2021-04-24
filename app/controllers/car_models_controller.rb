class CarModelsController < ApplicationController
  before_action :set_car_model, only: %i[ show edit update destroy ]

  # GET /car_models or /car_models.json
  def index
    # @car_models = CarModel.all
    @car_models = CarModel.joins("INNER JOIN car_makes ON car_makes.id = car_models.make_id").select(
      'car_makes.id, car_models.id, car_makes.name as make_name, car_makes.status as make_status, 
      car_makes.comments as makes_comments, car_models.name as car_model_name, car_models.model_date as model_date,
      car_models.make_id as model_make_id, car_models.comments as model_comments, 
      car_models.status as model_status')

  end

  # GET /car_models/1 or /car_models/1.json
  def show
  end

  # GET /car_models/new
  def new
    @car_model = CarModel.new
  end

  # GET /car_models/1/edit
  def edit
  end

  # POST /car_models or /car_models.json
  def create
    @car_model = CarModel.new(car_model_params)

    @all_models = CarModel.all

    @count = 0
    # logger.info "All colours ::: #{@all_colour.inspect}"

    @model_typed = (@car_model.name).downcase
    logger.info "#{@model_typed}"

    @all_models.each do |model|

      @index_model = (model.name).downcase

      if @index_model == @model_typed

        @count += 1

      end 


      logger.info "#{@index_model} --- make from loop"

    end 

    logger.info "Count details -- #{ @count}"
    logger.info "Car body details -- #{ @car_model.inspect}"

    respond_to do |format|
      if @count < 1
        @car_model.save
        format.html { redirect_to car_models_path, notice: "Car model was successfully created." }
        format.json { render :show, status: :created, location: @car_model }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_models/1 or /car_models/1.json
  def update
    respond_to do |format|
      if @car_model.update(car_model_params)
        format.html { redirect_to car_models_path, notice: "Car model was successfully updated." }
        format.json { render :show, status: :ok, location: @car_model }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_models/1 or /car_models/1.json
  def destroy
    @car_model.destroy
    respond_to do |format|
      format.html { redirect_to car_models_url, notice: "Car model was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_model
      @car_model = CarModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_model_params
      params.require(:car_model).permit(:name, :model_date, :status, :comments, :make_id)
    end
end
