class CarEnginesController < ApplicationController
  before_action :set_car_engine, only: %i[ show edit update destroy ]

  # GET /car_engines or /car_engines.json
  def index
    @car_engines = CarEngine.all
  end

  # GET /car_engines/1 or /car_engines/1.json
  def show
  end

  # GET /car_engines/new
  def new
    @car_engine = CarEngine.new
  end

  # GET /car_engines/1/edit
  def edit
  end

  # POST /car_engines or /car_engines.json
  def create
    @car_engine = CarEngine.new(car_engine_params)

    @all_engines = CarEngine.all

    @count = 0
    # logger.info "All colours ::: #{@all_colour.inspect}"

    @engine_typed = (@car_engine.engine_type).downcase
    logger.info "#{@engine_typed}"

    @all_engines.each do |engine|

      @index_engine = (engine.engine_type).downcase

      if @index_engine == @engine_typed

        @count += 1

      end 


      logger.info "#{@index_engine} --- make from loop"

    end 

    logger.info "Count details -- #{ @count}"
    logger.info "Car engines details -- #{ @car_engine.inspect}"


    respond_to do |format|
      if @count < 1
        @car_engine.save
        format.html { redirect_to car_engines_path, notice: "Car engine was successfully created." }
        format.json { render :show, status: :created, location: @car_engine }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_engine.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_engines/1 or /car_engines/1.json
  def update
    respond_to do |format|
      if @car_engine.update(car_engine_params)
        format.html { redirect_to @car_engine, notice: "Car engine was successfully updated." }
        format.json { render :show, status: :ok, location: @car_engine }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_engine.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_engines/1 or /car_engines/1.json
  def destroy
    @car_engine.destroy
    respond_to do |format|
      format.html { redirect_to car_engines_url, notice: "Car engine was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_engine
      @car_engine = CarEngine.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_engine_params
      params.require(:car_engine).permit(:engine_type)
    end
end
